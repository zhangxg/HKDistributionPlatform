package com.hk.distribution.model;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于存放生成html的表单元素，以后可以拓展为读取xml
 * @author WM
 *
 */
public class FormConfig {

	public static   String input_name = "<p>姓名：<input type='text' class='input' name='input_name' /></p>";
	public static   String input_age = "<p>年龄：<input type='text' class='input' name='input_age' /></p>";
	public static   String input_email = "<p>电子邮件：<input type='text' class='input' name='input_email' /></p>";
	public static   String input_sexgroup = "";
	public static   String input_telnumber = "<p>联系电话：<input type='text' class='input' name='input_tel' /></p>";
	public static   String input_qq = "<p>QQ：<input type='text' class='input' name='input_qq' /></p>";
	public static Map<String,String> getFormElement(){
		
		Map<String,String> formMap = new HashMap<String,String>();
		formMap.put("name", input_name);
		formMap.put("age", input_age);
		formMap.put("email", input_email);
		formMap.put("sexgroup", input_sexgroup);
		formMap.put("qq", input_qq);
		formMap.put("telnumber", input_telnumber);
		return formMap;
	}
}
