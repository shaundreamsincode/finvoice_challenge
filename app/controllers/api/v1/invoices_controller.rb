module Api
  module V1
    class InvoicesController < ApplicationController
      def index
        invoices = Invoice.all
        render json: invoices
      end

      def purchase
        invoice = Invoice.find(params[:invoice_id])

        invoice.update!(status: 'purchased')
        render json: invoice
      end

      def close
        invoice = Invoice.find(params[:invoice_id])

        invoice.update!(status: 'closed')
        render json: invoice
      end
    end
  end
end
