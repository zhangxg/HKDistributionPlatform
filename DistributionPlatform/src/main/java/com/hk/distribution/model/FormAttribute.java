package com.hk.distribution.model;

import java.io.Serializable;

public class FormAttribute implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;

	private int type;

	private String options;

	private String required;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
	}

	public String getRequired() {
		return required;
	}

	public void setRequired(String required) {
		this.required = required;
	}

	@Override
	public String toString() {
		StringBuffer buf = new StringBuffer();
		buf.append("name: " + this.name);
		buf.append("type: " + this.type);
		buf.append("options: " + this.options);
		buf.append("required: " + this.required);
		return buf.toString();
	}

}
