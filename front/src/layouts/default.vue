<template>
  <q-layout view="lHh Lpr lFf">
    <q-header color="secondary">
      <q-toolbar>
        <q-btn
          ripple
          flat
          round
          icon="img:statics/icons-app/menu.svg"
          @click="Hamburger()"
          aria-label="Menu"
        />
      <q-space />
          <div>
          <span
            v-show="notificacoes && notificacoes.length > 0"
            class="bg-negative text-center"
            :style="
              notificacoes.length > 99
                ? 'width: 20px;height: 20x;'
                : 'width: 17px;height: 17px;'
            "
            style="color: white;font-weight: bold;font-size: 0.7em;border-radius: 20%;margin-left: 25px;position: absolute;padding-top: 2px;"
            >{{ notificacoes.length }}</span
          >

          <q-btn
            size="md"
            flat
            dense
            no-ripple
            color="secondary"
            icon="img:statics/icons-app/mail.png"
            class="q-mr-md"
          >
          </q-btn>
        </div>
        <q-btn-dropdown
          flat
          no-ripple
          dense
          :label="user_name"
          size="md"
          icon="img:statics/icons-app/usuario.png"
        >
          <q-list link>
            <q-item @click.native="meusdados">
              <q-item-label>
                <q-item-section label>Meus dados</q-item-section>
              </q-item-label>
            </q-item>
            <q-item @click.native="suporte">
              <q-item-label>
                <q-item-section label>Suporte</q-item-section>
              </q-item-label>
            </q-item>
            <q-item @click.native="logout">
              <q-item-label>
                <q-item-section label>Sair</q-item-section>
              </q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      :mini="!leftDrawerOpen"
      class="no-shadow"
      v-model="alwaysOpen"
      content-class="bg-white"
      no-swipe-open
      no-swipe-close
    >
      <div
        class="bg-menu-logo"
        style="text-align: center; background-color: #fff"
      >
        <router-link :to="$route.name != 'login' ? { name: 'home' } : ''">
          <img
            v-if="leftDrawerOpen"
            src="../assets/logo.png"
            style="width:30%;height:60%"
            class="q-py-sm"
          />
          <img
            v-else
            src="../assets/logo.png"
            style="width: 60%;"
            class="q-py-sm"
          />
        </router-link>
      </div>

      <q-list no-border highlight link v-if="showMenu()" class="sidebar-links">
        <q-item
          v-for="(link, index) in links"
          :key="index"
          :to="{ name: link.to }"
          @click="Back()"
          class="q-py-md"
          :class="getActiveLink(link.to)"
          v-show="checkAllowed(link.to)"
        >
          <q-item-section avatar>
            <q-icon size="xs" color="secondary" :name="link.icon" />
          </q-item-section>
          <q-item-label> {{ link.label }} </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="color-back">
      <router-view />
    </q-page-container>
    <q-dialog v-model="error_dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ error_title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ error_message }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" @click="setGlobalMessage()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="notificacao_dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <q-icon name="fas fa-circle" color="positive" />
            {{ notificacao_title }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span v-html="notificacao_message" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script src="./default.js" />
<style lang="stylus" src="./default.styl" />
