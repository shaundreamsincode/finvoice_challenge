module Api
  module V1
    class InvoicesController < ApplicationController
      def index
        @invoices = Invoice.all
        render json: @invoices
      end
    end
  end
end
