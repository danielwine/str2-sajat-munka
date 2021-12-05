
let country = document.querySelector('select#country')
let setOptions = (itemList) => {
    let state = document.querySelector('select#state')
    state.innerHTML = '<option selected>Choose...</option>'
    itemList.forEach(item => {
        let option = document.createElement('option')
        option.value = item
        option.textContent = item
        state.appendChild(option)
    })
}

country.addEventListener('change', (ev) => {
    if (ev.target.value == 'USA') {
        setOptions([
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District Of Columbia",
            "Federated States Of Micronesia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Marshall Islands",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Mariana Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Palau",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virgin Islands",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ]
        )
    }
    if (ev.target.value == 'HUN') {
        setOptions([
            "Bács-Kiskun",
            "Baranya",
            "Békés",
            "Borsod-Abaúj-Zemplén",
            "Csongrád",
            "Fejér",
            "Győr-Moson-Sopron",
            "Hajdú-Bihar",
            "Heves",
            "Jász-Nagykun-Szolnok",
            "Komárom-Esztergom",
            "Nógrád",
            "Pest",
            "Somogy",
            "Szabolcs-Szatmár-Bereg",
            "Tolna",
            "Vas",
            "Veszprém",
            "Zala"
        ])
    }
})
