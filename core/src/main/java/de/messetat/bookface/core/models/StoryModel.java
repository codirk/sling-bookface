package de.messetat.bookface.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;

@Model(adaptables = SlingHttpServletRequest.class)
public class StoryModel {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Self
    private SlingHttpServletRequest request;


    @PostConstruct
    public void init() {
        LOG.debug("init");

    }

    public Resource getSuffixResource() {
        return request.getRequestPathInfo().getSuffixResource();
    }

}
