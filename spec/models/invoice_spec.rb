require 'rails_helper'

RSpec.describe Invoice, type: :model do
  describe '.purchase!' do
    subject { invoice.purchase! }

    let!(:invoice) { create(:invoice, status: status) }
    let(:status) { 'approved' }

    it 'sets the invoice to purchased' do
      expect { subject }.to change { invoice.reload.status }.to('purchased')
    end

    context 'when the invoice does not have an approved status' do
      let(:status) { 'closed' }

      it 'raises an error' do
        expect { subject }.to raise_error(Invoice::InvalidStatusError, /Only approved invoices can be set to purchased/)
      end
    end
  end

  describe '.close!' do
    subject { invoice.close! }

    let!(:invoice) { create(:invoice, status: status) }
    let(:status) { 'purchased' }

    it 'sets the invoice to closed' do
      expect { subject }.to change { invoice.reload.status }.to('closed')
    end

    context 'when the invoice does not have a purchased status' do
      let(:status) { 'approved' }

      it 'raises an error' do
        expect { subject }.to raise_error(Invoice::InvalidStatusError, /Only purchased invoices can be set to closed/)
      end
    end
  end

  describe 'as_json' do
    subject { invoice.as_json }
    let!(:invoice) { create(:invoice, invoice_params) }
    let(:invoice_params) { { token: 'abc123', amount: 50.0, fees_accrued: 1.0, due_at: Date.new(2020, 1,1 ), status: 'closed' } }

    it 'returns the invoice as JSON' do
      expect(subject).to include(
                           'id' => invoice.id,
                           'token' => 'abc123',
                           'amount' => '50.0',
                           'fees_accrued' => '1.0',
                           'due_at' => '2020-1-1',
                           'status' => 'closed'
                         )
    end

    context 'when the invoice has a scanned attachment' do
      let!(:invoice) { create(:invoice, :with_image, invoice_params) }

      it 'returns the filename of the scanned attachment' do
        expect(subject).to include('scan_filename' => 'test.png')
      end
    end
  end
end
