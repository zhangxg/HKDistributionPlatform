package com.hk.distribution.service;

import java.util.List;

import com.hk.distribution.model.Site;

public interface SiteService {

    public List<Site> getSiteList();
    public List<Site> getSite(Site site);

    public void saveSite(Site site);

    public void updateSite(Site site);

    public void deleteSiteByAdress(List<String> address);
}
