// import importComponents from 'src/mixins/importComponents'
export default {
  // mixins: [importComponents],
  data() {
    return {
        model: false,
        Basic: true,
        Advanced: false,
        Expert: false,
        Custom: false,
        Columns: [
            {classbase: "card1", name: "LEAD", color: "color1", colorinside: "color1_1"},
            {classbase: "card2", name: "RFP IN PROGRESS", color: "color2", colorinside: "color2_1"},
            {classbase: "card3", name: "SUBMITTED", color: "color3", colorinside: "color3_1"},
            {classbase: "card4", name: "WON", color: "color4", colorinside: "color4_1"},
            {classbase: "card5", name: "LOST", color: "color5", colorinside: "color5_1"},
            {classbase: "card6", name: "CLOSED", color: "color6", colorinside: "color6_1"},
        ],
        FilterColumns: []
    }
  },
  computed: {
      getHeader() {
          let headers = {}
          return headers = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      }
  },

  methods: {
    changecolumns(value) {
        this.Basic = false;
        this.Advanced = false;
        this.Expert = false;
        this.Custom = false;

        this[value] = true;

        switch(value){
            case "Basic":
                this.FilterColumns = this.Columns;
            break;
            case "Advanced":
                this.FilterColumns = this.Columns.filter(function (el) {
                        return el.name.toLowerCase().includes("o")
                    }
                );
            break;
            case "Expert":
                this.FilterColumns = this.Columns;
                this.FilterColumns = this.Columns.filter(function (el) {
                    return el.name.toLowerCase().includes("d")
                }
            );
            break;
            case "Custom":
                this.FilterColumns = this.Columns;
                this.FilterColumns = this.Columns.filter(function (el) {
                    return el.name.toLowerCase().includes("l")
                }
            );
            break;

        }
      }

  },

  mounted() {
     this.FilterColumns = this.Columns;
  }
}
