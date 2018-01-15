@disasters.each do |disaster|
    json.set! disaster.id do
        json.extract! disaster, :title, :state
    end
end