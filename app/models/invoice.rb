class Invoice < ApplicationRecord
  class InvalidStatusError < StandardError; end
  has_secure_token :token # todo - remove this

  def purchase!
    unless status == 'approved'
      raise InvalidStatusError, 'Only approved invoices can be set to purchased'
    end

    update!(status: 'purchased')
  end

  def close!
    unless status == 'purchased'
      raise InvalidStatusError, 'Only purchased invoices can be set to closed'
    end

    update!(status: 'closed')
  end
end
