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
			>
				<el-form-item label="手机" prop="phone">
					<el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-link :underline="false">
						没有账号？去<router-link tag="span" to="/register">注册</router-link>
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

			return {
				ruleForm: {
					phone: '',
					pass: '',
				},
				rules: {
					phone: [
						{ validator: checkPhone, trigger: 'blur' }
					],
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],

				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('submit!');


							this.$router.push({path:'/'})



					} else {
						console.log('error submit!!');
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