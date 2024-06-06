# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://one-drink.vercel.app' 
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
      max_age: 600,
      credentials: true
  end
end
