package com.hk.distribution.dao;

import java.util.List;

import com.hk.distribution.model.Site;

public interface SiteDao {

    public List<Site> getSiteList();

    public void saveSite(Site site);

    public void updateSite(Site site);

    public void deleteSiteByAdress(List<String> address);
}
