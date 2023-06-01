  task :seed_database => :environment do
    20.times do
      Invoice.create!(
        token: Faker::Alphanumeric.alpha(number: 10),
        amount: Faker::Number.decimal,
        due_at: Faker::Date.birthday,
        status: Invoice::STATUSES.values.sample
      )
    end

    true
end
