export const fetchDisasters = filters => (
    $.ajax({
        method: 'GET',
        url: 'api/disasters',
        data: filters
    })
);