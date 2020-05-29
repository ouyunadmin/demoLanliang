import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin/user', [
      'elements'
    ])
  }
}
