class HealthcheckController < ApplicationController
	def index
  	current_time = Time.now.to_i
  	render json: { time: current_time }
  end
end
