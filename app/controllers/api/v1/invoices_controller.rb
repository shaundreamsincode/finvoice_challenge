module Api
  module V1
    class InvoicesController < ApplicationController
      include ActiveStorage::SetCurrent

      # before_action do
      #   ActiveStorage::Current.url_options = { protocol: request.protocol, host: request.host, port: request.port }
      # end

      def index
        invoices = Invoice.all

        invoice = invoices.first
        scan = invoice.scan
        byebug
        url = scan.url
        render json: invoices
      end

      def purchase
        invoice = Invoice.find(params[:invoice_id])

        invoice.purchase!
        render json: invoice

      rescue Invoice::InvalidStatusError => e
        render json: {
          error: e.to_s,
        }, status: :bad_request
      end

      def close
        invoice = Invoice.find(params[:invoice_id])

        invoice.close!
        render json: invoice

      rescue Invoice::InvalidStatusError => e
        render json: {
          error: e.to_s,
        }, status: :bad_request
      end
    end
  end
end
