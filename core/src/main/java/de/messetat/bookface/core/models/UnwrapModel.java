package de.messetat.bookface.core.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.apache.sling.models.annotations.Filter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Locale;
import java.util.ResourceBundle;

@Model(adaptables = SlingHttpServletRequest.class, resourceType = "sling/servlet/default")
public class UnwrapModel {


    @Self
    private SlingHttpServletRequest request;



    @PostConstruct
    public void init() {

    }

    public boolean unwrap(){

        return  StringUtils.removeEnd(request.getPathInfo(), request.getRequestPathInfo().getSuffix()).contains(request.getResource().getPath());
    }

}
