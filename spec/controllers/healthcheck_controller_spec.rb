require 'rails_helper'

RSpec.describe HealthcheckController, type: :controller do
  describe "GET /index" do
    before do
      Timecop.freeze(Time.zone.local(2023, 1, 1, 12, 0, 0))
    end
      
    after do
      Timecop.return
    end

    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'returns current time in unix timestamp format' do
      get :index
      json_response = JSON.parse(response.body)
      current_time = Time.now.to_i
      returned_time = json_response['time']

      expect(returned_time).to eq(current_time)
    end
  end
end
