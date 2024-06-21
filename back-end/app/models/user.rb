class User < ApplicationRecord
<<<<<<< HEAD
    has_many :users_vendors
    has_many :vendors, through: :users_vendors
  end
  
=======
    self.table_name = 'users'  # Explicitly set the table name if it's not following Rails conventions
  
    validates :Uid, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :auth_token, uniqueness: true
  
    # Add any additional validations or associations if needed
  end
>>>>>>> williamBranch
