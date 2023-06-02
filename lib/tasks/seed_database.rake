  task :seed_database => :environment do
    20.times do
      invoice = Invoice.new(
        token: Faker::Alphanumeric.alpha(number: 10),
        amount: Faker::Number.decimal,
        fees_accrued: Faker::Number.decimal,
        due_at: Faker::Date.birthday,
        status: Invoice::STATUSES.values.sample
      )

      file_type = rand(0..1) == 0 ? 'image' : 'pdf'

      if file_type == 'image'
        invoice.scan.attach(io: File.open('./test.png'), filename: 'test.png', content_type: 'application/image')
      else
        invoice.scan.attach(io: File.open('./test.png'), filename: 'test.pdf', content_type: 'application/pdf')
      end

      invoice.save!
    end

    true
end
