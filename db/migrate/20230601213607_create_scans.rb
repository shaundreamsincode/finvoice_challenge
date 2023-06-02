class CreateScans < ActiveRecord::Migration[7.0]
  def change
    create_table :scans do |t|
      t.string :name
      t.references :invoice, null: false
      t.timestamps
    end
  end
end
