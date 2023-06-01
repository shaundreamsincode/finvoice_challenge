require 'rails_helper'

RSpec.describe Api::V1::InvoicesController, type: :controller do
  describe '#index' do
    let!(:invoice_1) { create(:invoice) }
    let!(:invoice_2) { create(:invoice) }

    it 'returns the invoices' do
      get :index
      expect(response.parsed_body).to include(
                                        a_hash_including('id' => invoice_1.id),
                                        a_hash_including('id' => invoice_2.id)
                                      )
    end
  end

  describe '#purchase' do
    subject { post :purchase, params: { invoice_id: invoice.id } }

    let!(:invoice) { create(:invoice, status: status) }
    let(:status) { 'approved' }

    it 'purchases the invoice' do
      expect { subject }
        .to change { invoice.reload.status }.to('purchased')

      expect(response.parsed_body).to include('id' => invoice.id, 'status' => 'purchased')
    end

    context 'when the invoice does not have an approved status' do
      let(:status) { 'closed' }

      it 'raises an error' do
        expect { subject }.to_not change { invoice.reload.status }

        expect(response.parsed_body).to include('error' => 'Only approved invoices can be set to purchased')
        expect(response.status).to eq(400)
      end
    end
  end

  describe '#close' do
    subject { post :close, params: { invoice_id: invoice.id } }

    let!(:invoice) { create(:invoice, status: status) }
    let(:status) { 'purchased' }

    it 'closes the invoice' do
      expect { subject }
        .to change { invoice.reload.status }.to('closed')

      expect(response.parsed_body).to include('id' => invoice.id, 'status' => 'closed')
    end

    context 'when the invoice does not have an approved status' do
      let(:status) { 'approved' }

      it 'does not close the invoice' do
        expect { subject }.to_not change { invoice.reload.status }

        expect(response.parsed_body).to include('error' => 'Only purchased invoices can be set to closed')
        expect(response.status).to eq(400)
      end
    end
  end
end
