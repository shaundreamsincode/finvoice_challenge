class Invoice < ApplicationRecord
  has_secure_token :token
end
