class Invoice < ApplicationRecord
  class InvalidStatusError < StandardError; end

  STATUSES = {
    created: 'created',
    rejected: 'rejected',
    approved: 'approved',
    purchased: 'purchased',
    closed: 'closed'
  }

  def purchase!
    unless status == STATUSES[:approved]
      raise InvalidStatusError, 'Only approved invoices can be set to purchased'
    end

    update!(status: STATUSES[:purchased])
  end

  def close!
    unless status == STATUSES[:purchased]
      raise InvalidStatusError, 'Only purchased invoices can be set to closed'
    end

    update!(status: STATUSES[:closed])
  end
end
