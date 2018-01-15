class Api::DisastersController < ApplicationController
    def index
        @disasters = Disaster.where(incidentType: "Earthquake", state: "CA")
    end
end
