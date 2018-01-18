require 'rails_helper'

RSpec.describe Api::DisastersController, type: :controller do
    describe "Index" do
        it "gets disasters by incident type" do
          get :index, { params: { incident_type: "Human Cause", year: "All" } }
          expect(response.content_type).to eq "application/json"
        end
    
        it "gets disasters by date" do
          get :index, { params: { year: 1989, incident_type: "All" }}
          expect(response.content_type).to eq "application/json"
        end
    
        it "gets disasters by date and incident type" do
          get :index, { params: { incident_type: "Earthquake", year: 1989 }}
          expect(response.content_type).to eq "application/json"
        end
    
        it "gets gets all disasters when date and incident type are 'All'" do
          get :index, { params: { incident_type: "All", year: "All" }}
          expect(response.content_type).to eq "application/json"
        end
    end
end
