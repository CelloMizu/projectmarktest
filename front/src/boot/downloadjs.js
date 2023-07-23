import downloadjs from 'downloadjs'

export default ({ app, router, Vue }) => {
	Vue.prototype.$download = downloadjs
	//Vue.use(downloadjs)
}
