class User < ApplicationRecord
    has_many :users_vendors
    has_many :vendors, through: :users_vendors
  end
  