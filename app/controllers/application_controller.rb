class ApplicationController < ActionController::API
    before_action :set_cors_headers
  
    def set_cors_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
      headers['Access-Control-Expose-Headers'] = 'Access-Control-Allow-Origin'
    end
end
  