class User < ApplicationRecord
    has_many :users_vendors, foreign_key: :uid, primary_key: :uid
    has_many :vendors, through: :users_vendors
end
