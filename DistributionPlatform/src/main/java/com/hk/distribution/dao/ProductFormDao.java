package com.hk.distribution.dao;

import java.util.List;

import com.hk.distribution.model.FormAttribute;

public interface ProductFormDao {
	
	public void saveFormAttribute(FormAttribute attr);
	
	public void updateFormAttribute(FormAttribute attr);
	
	public List<FormAttribute> listFormAttributes();
	
	public void deleteAttribute(List<String> names);

}
