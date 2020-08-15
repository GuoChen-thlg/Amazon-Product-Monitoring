 <template>
	<div class="outer">
		<div class="form-box">
			<h3>登录</h3>
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
				@keyup.enter.native="submitForm('ruleForm')"
			>
				<el-form-item label="手机" prop="phone">
					<el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-link :underline="false" style="float:left">
						<router-link tag="span" to="/">忘记密码？</router-link>
					</el-link>
					<el-link :underline="false" style="float:right">
						<router-link tag="span" to="/register">没有账号？去注册</router-link>
					</el-link>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" size="medium">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

 <script>
	export default {
		name: 'Login',
		data() {
			return {
				ruleForm: {
					phone: '',
					pass: '',
				},
				rules: {
					phone: [
						{ required: true, message: '手机不能为空' },
						{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' },
					],
					pass: [
						{ required: true, message: '密码不能为空' },
						{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/, message: '至少6位密码（包含大小写字母及数字）', trigger: 'blur' }
					],

				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const loading = this.$loading({
							lock: true,
							text: '正在登陆',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						// 登陆操作
						this.$store.commit('setUser', {
							member: false,
							login: true,
						})
						setTimeout(() => {

							loading.close();
							this.$router.push({ path: '/' })
						}, 5000);
					} else {
						return false;
					}
				});
			},
			// resetForm(formName) {
			// 	this.$refs[formName].resetFields();
			// }

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