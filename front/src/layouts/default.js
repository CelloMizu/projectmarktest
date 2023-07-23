// import headerTitle from '../components/header-title'
// import headerTitleAproval from '../components/header-title-aproval'
// import headerTitleInitital from '../components/header-title-initial'
import socketio from 'socket.io-client'
import { mapGetters } from 'vuex'
// import importComponents from 'src/mixins/importComponents'
import axiosOneSignal from 'axios'
import env from '../../config/helpers/env'

export default {
    // mixins: [importComponents],
    components: {
        // 'header-title': headerTitle,
        // 'header-title-aproval': headerTitleAproval,
        // 'header-title-initial': headerTitleInitital
    },
    data() {
        return {
            search: '',
            alwaysOpen: true,
            notificacoes: [],
            links: [
                {
                    label: 'Início',
                    to: 'home',
                    icon: 'img:statics/icons-app/Home.png'
                },
                {
                    label: 'Instituições',
                    to: 'instituicao',
                    icon: 'img:statics/icons-app/instituicao.png'
                },
                {
                    label: 'Cursos',
                    to: 'curso',
                    icon: 'img:statics/icons-app/cursos.png'
                },
                {
                    label: 'Turmas',
                    to: 'turma',
                    icon: 'img:statics/icons-app/categorias.png'
                },
                {
                    label: 'Pacotes',
                    to: 'pacote',
                    icon: 'img:statics/icons-app/produtos.png'
                },
                {
                    label: 'Produtos',
                    to: 'produto',
                    icon: 'img:statics/icons-app/album.png'
                },
                {
                    label: 'Formandos',
                    to: 'cadastro',
                    icon: 'img:statics/icons-app/capelo.png'
                },
                {
                    label: 'Compras',
                    to: 'compra',
                    icon: 'img:statics/icons-app/compra.png'
                },
                {
                    label: 'Pagamentos',
                    to: 'pagamento',
                    icon: 'img:statics/icons-app/money.png'
                },

            ],
            socket: null,
            error_message: '',
            error_title: '',
            error_dialog: false,
            notificacao_message: '',
            notificacao_title: '',
            notificacao_dialog: false,
            teste: '',
            thumbStyle: {
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#4A546D',
                width: '5px',
                opacity: 0.75
            },

            barStyle: {
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#A5C3D1',
                width: '9px',
                opacity: 0.2
            }
        }
    },

    computed: {
        ...mapGetters({
            user_id: 'getUserId',
            user_token: 'getUserToken',
            global_dialog: 'getGlobalDialog',
            global_title: 'getGlobalTitle',
            global_message: 'getGlobalMessage',
            access_level: 'getAccessLevel',
            user_name: 'getUserName',
            user_profile: 'getUserProfile',
            leftDrawerOpen: 'getMenuOpen'
        }),

        getHeader() {
            let headers = {}
            return headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.user_token
                }
            }
        },

        getTitle() {
            if (this.$route.name == 'home') return 'Início'
            else if (this.$route.name == 'edicao') return 'Configuração da Vitrine'
            else if (this.$route.name == 'categorias') return 'Categorias'
            else if (this.$route.name == 'produto') return 'Produtos'
        },
    },

    methods: {
        goTo() {
            if (this.leftDrawerOpen) {
                this.Back();
            }
            this.$router.push({ name: route })
        },

        getActiveLink(route) {
            let route_name = this.$route.name

            if (route == 'home') {
                if (route_name == 'home' ) return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'instituicao') {
                if (route_name == 'instituicao' ) return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'curso') {
                if (route_name == 'curso') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'turma') {
                if (route_name == 'turma') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'pacote') {
                if (route_name == 'pacote') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'produto') {
                if (route_name == 'produto') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'cadastro') {
                if (route_name == 'cadastro') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'compra') {
                if (route_name == 'compra') return 'router-link-exact-active router-link-active'
                else return ''
            }
            else if (route == 'pagamento') {
                if (route_name == 'pagamento') return 'router-link-exact-active router-link-active'
                else return ''
            }

        },

        handlerFunction() {
            this.$router.push({ name: 'login' })
        },

        showMenu() {
            if (this.$route.name != 'login' && this.$route.name != 'email-aproval' && this.$route.name != 'email-reproval') return true
            else return false
        },

        showMenuAproval() {
            if (this.$route.name == 'email-aproval' || this.$route.name == 'email-reproval') return true
            else return false
        },

        newSocket() {
            this.$axios.get('/integracoes/HostWebSocketNotificacao')
                .then(response => {
                    let url = response.data
                    let socket = socketio(url, { path: '/Notificacoes?Idusuario=' + this.user_id + '&' })
                    this.socket = socket

                    this.socket.on('data', (data) => {
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        },

        logout() {
            this.$store.dispatch('SET_USER_DATA', ['', '', '', '', []])
            this.$router.push({ name: 'login' })
        },

        meusdados() {
          this.$router.replace({ name: 'dados' })
        },

        suporte() {
          window.open("https://api.whatsapp.com/send?phone=5511988461368&text=Preciso%20de%20suporte%20com%20minha%20Vitrine",'_blank')
        },

        setGlobalMessage() {
            this.error_message = ''
            this.error_title = ''
            this.error_dialog = ''

            this.$store.dispatch('SET_GLOBAL_MESSAGE', [this.error_dialog, this.error_title, this.error_message])
        },

        checkAllowed(route_name) {
            let allowed = true
            if (this.user_profile == "Vendedor" || this.user_profile == "Vendedor EX"){
                if(route_name == "home" || route_name == "cadastro" || route_name == "compra" || route_name == "pagamento" )
                {
                    allowed = true
                } else {
                    allowed = false
                }
            } else {
                allowed = true
            }
            // if (this.access_level.length > 0) {
            //     let obj_raw = this.access_level.find((obj) => { return obj.route_name == route_name })
            //     if (obj_raw) allowed = obj_raw.allow
            // }
            return allowed
        },

        Back() {
            if (this.leftDrawerOpen && this.$q.screen.width > 600)
                this.$store.dispatch('SET_MENU_OPEN', !this.leftDrawerOpen)
        },

        Hamburger() {
            if (this.$q.screen.width > 600) {
                this.$store.dispatch('SET_MENU_OPEN', !this.leftDrawerOpen)
            }
            else {
                if (this.alwaysOpen == false) {
                    this.alwaysOpen = true
                }
                else if (this.alwaysOpen == true) {
                    this.alwaysOpen = false
                }
            }
        },

    },

    watch: {
        user_id: function () {
            if (!this.socket && this.user_id) {
                //this.newSocket() //estava comentado
            }
            else if (this.socket && !this.user_id) {
                this.socket = null
            }
        },

        global_dialog: function () {
            if (this.global_message) {
                this.error_message = this.global_message
                this.error_title = this.global_title
                this.error_dialog = this.global_dialog
            }
            else {
                this.error_message = ''
                this.error_title = ''
                this.error_dialog = false
            }
        }
    },
    created() {
        this.$store.dispatch('SET_MENU_OPEN', this.$q.platform.is.desktop);
        //this.loadNotificacao();
    },
    mounted() {

    },

}
