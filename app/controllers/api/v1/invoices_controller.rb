module Api
  module V1
    class InvoicesController < ApplicationController
      def index
        invoices = Invoice.all
        render json: invoices
      end

      def purchase
        invoice = Invoice.find(params[:invoice_id])

        # todo - add checking to make sure invoice is approved & use enums & put this into a model/command
        invoice.update!(status: 'purchased')
        render json: invoice
      end
    end
  end
end
