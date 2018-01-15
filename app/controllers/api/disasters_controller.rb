class Api::DisastersController < ApplicationController
    def index
        @disasters = Disaster.where(incidentType: params[:incidentType])
    end
end
