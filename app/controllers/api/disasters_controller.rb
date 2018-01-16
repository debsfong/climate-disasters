class Api::DisastersController < ApplicationController
    def index
        render json: Disaster.where(incidentType: params[:incidentType]).group("state").count
    end
end
