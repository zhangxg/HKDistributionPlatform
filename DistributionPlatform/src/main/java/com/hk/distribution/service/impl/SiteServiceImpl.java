package com.hk.distribution.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hk.distribution.dao.SiteDao;
import com.hk.distribution.model.Site;
import com.hk.distribution.service.SiteService;

@Transactional
@Service
public class SiteServiceImpl implements SiteService {

    @Autowired
    private SiteDao siteDao;

    @Override
    public List<Site> getSiteList() {
        return siteDao.getSiteList();
    }

    @Override
    public void saveSite(Site site) {
        siteDao.saveSite(site);
    }

    @Override
    public void updateSite(Site site) {
        siteDao.updateSite(site);
    }

    @Override
    public void deleteSiteByAdress(List<String> address) {
        siteDao.deleteSiteByAdress(address);
    }

    public void setSiteDao(SiteDao siteDao) {
        this.siteDao = siteDao;
    }
}
