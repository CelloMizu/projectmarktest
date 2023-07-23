<template>
  <q-page>
    <q-card class="q-ma-lg">
      <div class="row q-pa-md ">
        <div
          class="col-xs-12 col-md-3 q-mb-md"
          v-for="(button, index) in buttonList"
          :key="index"
          v-show="checkAllowed(button.to)"
        >
          <q-btn
            iconLeft
            :label="button.label"
            outline
            :backgroundColor="'grey-8'"
            :style="$q.screen.width < 600 ? 'width: 100%' : 'width: 90%'"
            v-if="checkAllowed(button.to)"
            @click="$router.push({ name: button.to })"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      user_id: "getUserId",
      user_token: "getUserToken",
      global_dialog: "getGlobalDialog",
      global_title: "getGlobalTitle",
      global_message: "getGlobalMessage",
      access_level: "getAccessLevel",
      user_name: "getUserName",
      leftDrawerOpen: "getMenuOpen"
    }),

    getHeader() {
      let headers = {};
      return (headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + this.user_token
        }
      });
    }
  },
  data() {
    return {
      buttonList: [
      ]
    };
  },
  methods: {
    checkAllowed(route_name) {
      let allowed = false;
      if (this.access_level.length > 0) {
        let obj_raw = this.access_level.find(obj => {
          return obj.route_name == route_name;
        });
        if (obj_raw) allowed = obj_raw.allow;
      }
      return allowed;
    }
  }
};
</script>

<style></style>
