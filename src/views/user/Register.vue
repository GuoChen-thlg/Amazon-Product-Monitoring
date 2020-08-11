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
			>
				<el-form-item label="手机" prop="phone">
					<el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item>
					<el-link :underline="false">
						已有账号？去<router-link tag="span" to="/login">登录</router-link>
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
	export default {
		name: 'Register',
		data() {
			let checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机不能为空'));
				}
				setTimeout(() => {
					if (!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.ruleForm.phone)) {
						callback(new Error('请输入正确的手机号码'));
					} else {
						callback();
					}
				}, 1000);
			};
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			let validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					phone: '',
					pass: '',
					checkPass: '',
				},
				rules: {
					phone: [
						{ validator: checkPhone, trigger: 'blur' }
					],
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass2, trigger: 'blur' }
					],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');



						

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

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