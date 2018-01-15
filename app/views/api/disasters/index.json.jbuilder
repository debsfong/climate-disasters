@disasters.each do |disaster|
    json.set! disaster.id do
        json.partial! 'disaster', disaster: disaster
    end
end