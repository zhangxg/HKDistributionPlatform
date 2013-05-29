package com.hk.distribution.service;

import java.util.List;

import com.hk.distribution.model.FormAttribute;

public interface ProductFormService {
	
	public List<FormAttribute> listFormAttributes();
	
	public void saveFormAttribute(FormAttribute attr);

}
