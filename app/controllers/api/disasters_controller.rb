class Api::DisastersController < ApplicationController
    def index
        # disasters = filters ? Disaster.
        @disasters = Disaster.where(incidentType: "Earthquake", state: "CA")
    end
end
