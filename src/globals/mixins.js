export default {
  data:() => ({
    //
  }),
  computed: {
    //
  },
  methods: {
    validateEmail (email) {
      var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$', 'i')
      return EMAIL_REGEXP.test(email)
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    formatYMD(date) {
      const newDate = new Date(date);
      return newDate.getFullYear()+'-' + (newDate.getMonth()+1) + '-'+ newDate.getDate();
    }
  }
}
