package de.messetat.bookface.core.models;

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
public class StoryModel {

    private final Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Self
    private SlingHttpServletRequest request;

    @Inject
    @Filter("(component.name=org.apache.sling.i18n.impl.JcrResourceBundleProvider)")
    private ResourceBundleProvider i18nProvider;

    @PostConstruct
    public void init() {
        LOG.debug("init");
        Locale currentLocale = Locale.GERMAN;
        if(i18nProvider != null) {
            ResourceBundle bundle = i18nProvider.getResourceBundle(currentLocale);
            String localizationMessage = bundle.getString("color");
            LOG.debug(localizationMessage);
        }

    }

    public Resource getSuffixResource() {
        return request.getRequestPathInfo().getSuffixResource();
    }

}
