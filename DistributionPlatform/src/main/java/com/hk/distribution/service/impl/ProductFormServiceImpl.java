package com.hk.distribution.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hk.distribution.dao.ProductFormDao;
import com.hk.distribution.model.FormAttribute;
import com.hk.distribution.service.ProductFormService;

@Transactional
@Service
public class ProductFormServiceImpl implements ProductFormService {
	
	@Autowired
	private ProductFormDao proFormDao;

	@Override
	public List<FormAttribute> listFormAttributes() {
		return proFormDao.listFormAttributes();
	}

	@Override
	public void saveFormAttribute(FormAttribute attr) {
		proFormDao.saveFormAttribute(attr);
	}

	@Override
	public void deleteAttribute(List<String> names) {
		proFormDao.deleteAttribute(names);
		
	}

	@Override
	public void updateAttribute(FormAttribute attr) {
		proFormDao.updateFormAttribute(attr);
	}
}
