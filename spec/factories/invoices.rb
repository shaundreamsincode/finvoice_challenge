FactoryBot.define do
  factory :invoice do
    trait :with_image do
      after(:build) do |invoice|
        invoice.scan.attach(
          io: File.open('./test.png'),
          filename: 'test.png',
          content_type: 'application/image'
        )
      end
    end
  end
end
