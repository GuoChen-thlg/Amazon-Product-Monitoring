 <template>
	<div class="outer">
		<div class="form-box">
			<h3>注册</h3>
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
				@keyup.enter.native="submitForm('ruleForm')"
			>
				<el-form-item label="用户名" prop="name">
					<el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="验证码" prop="code">
					<el-col :span="15">
						<el-input type="text" v-model.trim="ruleForm.code" autocomplete="off"></el-input>
					</el-col>
					<el-col :span="8" :offset="1">
						<el-button @click.prevent="requestCode" :disabled="code_btn.disabled" v-text="code_btn.label"></el-button>
					</el-col>
				</el-form-item>-->
				<el-form-item label="邮箱" prop="email">
					<el-input type="email" v-model.trim="ruleForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item>
					<el-link :underline="false">
						<router-link tag="span" to="/login">已有账号？去登录</router-link>
					</el-link>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

 <script>
	import { register } from '@/api'
	export default {
		name: 'register',
		data() {
			let validatePass2 = (rule, value, callback) => {
				if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name: 'test0001',
					phone: '',
					// code: '',
					email: '',
					pass: 'Test0001',
					checkPass: 'Test0001',
				},
				rules: {
					name: [
						{ required: true, message: '用户名不能为空' },
						{ pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/, message: '至少4位（数字/字母/汉字）', trigger: 'blur' }
					],
					phone: [
						{ required: false, message: '手机不能为空' },
						{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' },
					],
					// code: [
					// 	{ required: true, message: '验证码不能为空' },
					// 	{ min: 6, message: '请输入6位验证码', trigger: 'blur' },
					// 	{ max: 6, message: '请输入6位验证码', trigger: 'blur' }
					// ],
					email: [
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
					],
					pass: [
						{ required: true, message: '密码不能为空' },
						{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/, message: '至少6位密码（包含大小写字母及数字）', trigger: 'blur' }
					],
					checkPass: [
						{ required: true, message: '请再次输入密码' },
						{ validator: validatePass2, trigger: 'blur' }
					],
				},
				code_btn: {
					label: '获取验证码',
					disabled: false,
				}
			};
		},
		mounted() {
			this.whetherLanding()
		},
		methods: {
			/**
			 * 用户是否已经登录
			 */
			whetherLanding() {
				if (this.$store.getters.isInlogin) {
					this.$router.push({ path: '/index' })
				}
			},
			/**
			 * 提交表单
			 * 注册
			 */
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const loading = this.$loading({
							lock: true,
							text: '正在注册',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						// 注册操作
						register({
							u_name: this.ruleForm.name,
							u_phone: this.ruleForm.phone,
							u_password: this.ruleForm.pass,
						}).then(data => {
							console.log(data);
							if (data.status === '200') {
								loading.close();
								this.$message({
									message: '注册成功，请登录',
									type: 'success'
								});
								this.$router.push({ path: '/login' })
							} else {
								loading.close();
								if (data.error) {
									this.$message({
										message: data.error,
										type: 'error'
									});
								} else {
									this.$message({
										message: '注册失败',
										type: 'error'
									});

								}
							}
						}).catch(error => {
							loading.close();
							console.log(error);
						})

					} else {
						return false;
					}
				});
			},
			/**
			 * 
			 */
			requestCode() {
				this.code_btn.disabled = true;
				let ss = 60;
				const times = setInterval(() => {
					ss--;
					this.code_btn.label = `${ss}秒`
					if (ss === 0) {
						this.code_btn.label = `获取验证码`
						clearTimeout(times)
						this.code_btn.disabled = false
					}
				}, 1000)
				console.log('发送验证码')
			}

		},
	}
 </script>

 <style lang='scss' scoped>
	.outer {
		h3 {
			text-align: center;
			margin-bottom: 30px;
		}
		.form-box {
			width: 500px;
			margin: 8% auto 0;
			button {
				width: 100%;
			}
		}
	}
</style>			