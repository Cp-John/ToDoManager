class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.belongs_to :category
      t.string :status
      t.string :description
      t.string :title
      
      t.timestamps
    end
  end
end
