class AnalyzeController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]
  
    def create

        # コンソールで値確認
        puts "Received parameters: #{params.inspect}"
      
        # フロントエンドから送信されたデータを受け取る
      budget = params[:budget]
      has_caffeine = params[:hasCaffeine]
      feeling = params[:feeling]
      commitment = params[:commitment]
      drink_size = params[:drinkSize]
  
      # 受け取ったデータをもとに何らかの分析を行う（ここではダミーのレスポンスを返す）
      analysis_result = "Analyzed: #{budget}, #{has_caffeine}, #{feeling}, #{commitment}, #{drink_size}"
  
      # 分析結果をJSONとしてフロントエンドに返す
      render json: { result: analysis_result }
    end
  end