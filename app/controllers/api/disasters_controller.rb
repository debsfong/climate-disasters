class Api::DisastersController < ApplicationController
    def index
        if params[:year] != "All" && params[:incident_type] != "All"
            render json: Disaster.where('extract(year from incident_begin_date) = ?', params[:year] ).where(incident_type: params[:incident_type]).group(:state).count
        elsif params[:year] != "All"
            render json: Disaster.where('extract(year from incident_begin_date) = ?', params[:year] ).group(:state).count
        elsif params[:incident_type] != "All"
            render json: Disaster.where(incident_type: params[:incident_type]).group("state").count
        else
            render json: Disaster.all.group(:state).count
        end
    end
end