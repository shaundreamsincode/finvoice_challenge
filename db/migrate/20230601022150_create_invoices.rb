class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.text :token, nil: false
      t.decimal :amount
      t.text :due_at
      t.text :status
      t.index :token, unique: true
      t.timestamps
    end
  end
end
